import React, { useRef, useEffect } from 'react';

const ThreeDNetwork = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Resize handler
        const handleResize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width || 500;
            canvas.height = 420;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // 3D Point class
        class Point3D {
            constructor(x, y, z, color = '#ffffff') {
                this.x = x;
                this.y = y;
                this.z = z;
                this.color = color;
                this.baseSize = 2.5 + Math.random() * 2;
            }
        }

        const points = [];
        const numPoints = 80;
        const sphereRadius = 145;

        // Generate points in a 3D sphere
        for (let i = 0; i < numPoints; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
            const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
            const z = sphereRadius * Math.cos(phi);
            
            // Slate blue and sage green points
            const color = Math.random() > 0.45 ? '#6e8cb7' : '#81b29a';
            points.push(new Point3D(x, y, z, color));
        }

        // Generate central Jet points using Luminous Clarity palette
        const jetPoints = [
            new Point3D(0, 0, 75, '#2e4263'),
            new Point3D(-55, 0, -20, '#6e8cb7'),
            new Point3D(55, 0, -20, '#6e8cb7'),
            new Point3D(0, 20, -45, '#81b29a'),
            new Point3D(0, -10, 15, '#f2f4f7'),
            new Point3D(-10, 4, -12, '#2e4263'),
            new Point3D(10, 4, -12, '#2e4263')
        ];

        const jetConnections = [
            [0, 1], [0, 2], [0, 4], [1, 5], [2, 6], [4, 5], [4, 6],
            [1, 3], [2, 3], [5, 3], [6, 3], [5, 6]
        ];

        // Rotation speeds
        let angleX = 0.003;
        let angleY = 0.005;
        let targetAngleX = 0.003;
        let targetAngleY = 0.005;

        // Mouse coordinates relative to canvas center
        let clientX = -9999;
        let clientY = -9999;

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            clientX = e.clientX - rect.left;
            clientY = e.clientY - rect.top;
            
            // Adjust rotation speeds based on mouse offsets
            const xOffset = clientX - canvas.width / 2;
            const yOffset = clientY - canvas.height / 2;
            targetAngleY = (xOffset / (canvas.width / 2)) * 0.025;
            targetAngleX = (yOffset / (canvas.height / 2)) * 0.025;
        };

        const handleMouseLeave = () => {
            targetAngleX = 0.003;
            targetAngleY = 0.005;
            clientX = -9999;
            clientY = -9999;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const focalLength = 300;

        // Render loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Interpolate rotation speeds
            angleY += (targetAngleY - angleY) * 0.05;
            angleX += (targetAngleX - angleX) * 0.05;

            const cosX = Math.cos(angleX);
            const sinX = Math.sin(angleX);
            const cosY = Math.cos(angleY);
            const sinY = Math.sin(angleY);

            // Project and rotate global sphere points
            const projectedPoints = points.map(p => {
                let x1 = p.x * cosY - p.z * sinY;
                let z1 = p.z * cosY + p.x * sinY;
                let y2 = p.y * cosX - z1 * sinX;
                let z2 = z1 * cosX + p.y * sinX;

                p.x = x1;
                p.y = y2;
                p.z = z2;

                const scale = focalLength / (focalLength + z2);
                const x2d = (x1 * scale) + canvas.width / 2;
                const y2d = (y2 * scale) + canvas.height / 2;

                return { 
                    x: x2d, 
                    y: y2d, 
                    z: z2, 
                    color: p.color, 
                    size: p.baseSize * scale
                };
            });

            // Project and rotate Jet points
            const projectedJet = jetPoints.map(p => {
                let x1 = p.x * cosY - p.z * sinY;
                let z1 = p.z * cosY + p.x * sinY;
                let y2 = p.y * cosX - z1 * sinX;
                let z2 = z1 * cosX + p.y * sinX;

                p.x = x1;
                p.y = y2;
                p.z = z2;

                const scale = focalLength / (focalLength + z2);
                return { x: (x1 * scale) + canvas.width / 2, y: (y2 * scale) + canvas.height / 2, z: z2, color: p.color };
            });

            // Proximity/Hover Detection
            let closestNode = null;
            let minDistance = 16;

            projectedPoints.forEach(pt => {
                const dx = clientX - pt.x;
                const dy = clientY - pt.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestNode = pt;
                }
            });

            if (closestNode) {
                // Inspected node found! Draw glowing radar indicator around it (sage green)
                ctx.beginPath();
                ctx.arc(closestNode.x, closestNode.y, closestNode.size + 8, 0, Math.PI * 2);
                ctx.strokeStyle = '#81b29a';
                ctx.lineWidth = 1;
                ctx.shadowColor = '#81b29a';
                ctx.shadowBlur = 8;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            // Draw network lines (close nodes)
            ctx.lineWidth = 0.5;
            for (let i = 0; i < projectedPoints.length; i++) {
                for (let j = i + 1; j < projectedPoints.length; j++) {
                    const dx = projectedPoints[i].x - projectedPoints[j].x;
                    const dy = projectedPoints[i].y - projectedPoints[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 80) {
                        const alpha = (1 - dist / 80) * 0.12;
                        ctx.strokeStyle = `rgba(110, 140, 183, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y);
                        ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw Jet central wireframe connections
            ctx.lineWidth = 1.5;
            jetConnections.forEach(([p1Idx, p2Idx]) => {
                const pt1 = projectedJet[p1Idx];
                const pt2 = projectedJet[p2Idx];
                const grad = ctx.createLinearGradient(pt1.x, pt1.y, pt2.x, pt2.y);
                grad.addColorStop(0, pt1.color);
                grad.addColorStop(1, pt2.color);
                ctx.strokeStyle = grad;
                ctx.beginPath();
                ctx.moveTo(pt1.x, pt1.y);
                ctx.lineTo(pt2.x, pt2.y);
                ctx.stroke();
            });

            // Draw Z-sorted sphere nodes
            projectedPoints
                .sort((a, b) => b.z - a.z)
                .forEach(pt => {
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, Math.max(0.1, pt.size), 0, Math.PI * 2);
                    ctx.fillStyle = pt.color;
                    if (pt.z < 0) {
                        ctx.shadowColor = pt.color;
                        ctx.shadowBlur = 6;
                    }
                    ctx.fill();
                    ctx.shadowBlur = 0;
                });

            // Draw Jet nodes
            projectedJet.forEach(pt => {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = pt.color;
                ctx.shadowColor = pt.color;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '420px', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-glass)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)' }}>
            <canvas ref={canvasRef} style={{ display: 'block', background: 'radial-gradient(circle at center, #111622 0%, #0b0e14 100%)' }} />
        </div>
    );
};

export default ThreeDNetwork;
