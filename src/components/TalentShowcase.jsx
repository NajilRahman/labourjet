import React, { useState, useEffect } from 'react';

const TalentShowcase = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const talents = [
        {
            id: 1,
            name: 'Elena Rostova',
            role: 'React Specialist',
            match: '99% Match Rate',
            status: 'AVAILABLE',
            statusColor: '#10b981',
            skills: ['React 18', 'Redux', 'WebGL'],
            bio: 'Specializing in high-performance Web3 frontends and interactive 3D interfaces.',
            avatar: '🪐'
        },
        {
            id: 2,
            name: 'Marcus Chen',
            role: 'Cloud Engineer',
            match: '96% Match Rate',
            status: 'AVAILABLE',
            statusColor: '#10b981',
            skills: ['AWS', 'Docker', 'Kubernetes'],
            bio: 'Architecting zero-latency serverless environments and secure microservices pipelines.',
            avatar: '🚀'
        },
        {
            id: 3,
            name: 'Sarah Jenkins',
            role: 'UI/UX Architect',
            match: '98% Match Rate',
            status: 'IN CONTRACT',
            statusColor: '#3b82f6',
            skills: ['Figma', 'Aesthetics', 'Three.js'],
            bio: 'Crafting immersive futuristic visual interfaces and highly engaging glassmorphism systems.',
            avatar: '⚡'
        }
    ];

    return (
        <div style={{
            background: 'rgba(17, 24, 39, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: '#f8fafc',
            marginTop: '30px'
        }}>
            {/* Header section */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                paddingBottom: '16px',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="d-inline-block" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6', boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}></span>
                    <span style={{ fontFamily: 'Space Grotesk', letterSpacing: '0.1em', fontSize: '0.85rem', color: '#ffffff', fontWeight: '700' }}>📡 LIVE_TALENT_INDEX</span>
                </div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#9ca3af' }}>
                    LAST SYNC: {currentTime}
                </div>
            </div>

            {/* Sub-header text */}
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.6' }}>
                Verify active elite specialists currently synced with the secure mesh network. Browse match rates, skills indexes, and instant engagement statuses.
            </p>

            {/* Profile cards Grid */}
            <div className="row g-4">
                {talents.map(talent => (
                    <div key={talent.id} className="col-lg-4 col-md-6 col-12">
                        <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '10px',
                            padding: '20px',
                            height: '100%',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.35)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                            <div>
                                {/* Card Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{talent.avatar}</span>
                                    <span style={{
                                        fontFamily: 'Space Grotesk',
                                        fontSize: '0.65rem',
                                        color: talent.statusColor,
                                        border: `1px solid ${talent.statusColor}`,
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        letterSpacing: '0.05em',
                                        fontWeight: '600'
                                    }}>
                                        ● {talent.status}
                                    </span>
                                </div>

                                {/* Title & Role */}
                                <h5 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                                    {talent.name}
                                </h5>
                                <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#3b82f6', marginBottom: '10px', fontWeight: '600' }}>
                                    {talent.role}
                                </div>

                                {/* Match rate bar */}
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span>Sync Index</span>
                                    <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>{talent.match}</span>
                                </div>
                                <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginBottom: '16px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: talent.id === 1 ? '99%' : talent.id === 2 ? '96%' : '98%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                                        borderRadius: '2px'
                                    }}></div>
                                </div>

                                {/* Bio */}
                                <p style={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '16px' }}>
                                    {talent.bio}
                                </p>
                            </div>

                            {/* Skills tags */}
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {talent.skills.map((skill, idx) => (
                                    <span key={idx} style={{
                                        fontSize: '0.65rem',
                                        color: '#ffffff',
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        border: '1px solid rgba(59, 130, 246, 0.25)',
                                        padding: '2px 8px',
                                        borderRadius: '4px'
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer mini info */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#6b7280', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '12px' }}>
                <span>ENCRYPTED SMART MATCH ACTIVE</span>
                <span>SECURE DIGITAL CONTRACTS INTEGRATED</span>
            </div>
        </div>
    );
};

export default TalentShowcase;
