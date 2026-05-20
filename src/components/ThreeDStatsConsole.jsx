import React, { useState, useEffect } from 'react';

const ThreeDStatsConsole = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [ping, setPing] = useState(14);
    const [activeUsers, setActiveUsers] = useState(1420);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
            // Randomly fluctuate ping and active users slightly for dynamic realism
            setPing(prev => Math.max(8, Math.min(45, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))));
            setActiveUsers(prev => prev + (Math.random() > 0.6 ? 1 : -1) * Math.floor(Math.random() * 2));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const mockEvents = [
        { id: 1, time: '12:04:15', msg: 'SECURE_CONTRACT_GENERATE: ID_8209_SIGNED', status: 'SUCCESS', color: '#00f2fe' },
        { id: 2, time: '12:05:32', msg: 'EMPLOYEE_VERIFIED: NAJIL_RAHMAN', status: 'ACCEPTED', color: '#39ff14' },
        { id: 3, time: '12:06:08', msg: 'DB_CONNECTION_LOCAL: SYNC_COMPASS_OK', status: 'ONLINE', color: '#00f2fe' },
        { id: 4, time: '12:07:44', msg: 'CLOUDINARY_BYPASS_LOCAL_UPLOADS: ACTIVE', status: 'LOCAL_FS', color: '#ff007f' }
    ];

    return (
        <div style={{
            background: 'rgba(10, 6, 26, 0.75)',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 242, 254, 0.1)',
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#f8fafc',
            marginTop: '30px'
        }}>
            {/* Header console */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0, 242, 254, 0.15)',
                paddingBottom: '12px',
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="d-inline-block" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#39ff14', boxShadow: '0 0 10px #39ff14' }}></span>
                    <span style={{ fontFamily: 'Orbitron', letterSpacing: '0.15em', fontSize: '0.85rem', color: '#00f2fe' }}>SYSTEM_CORE_DASHBOARD</span>
                </div>
                <div style={{ fontFamily: 'Orbitron', fontSize: '0.75rem', color: '#94a3b8' }}>
                    TIME: {currentTime}
                </div>
            </div>

            {/* Grid layout */}
            <div className="row g-4">
                {/* Col 1: System Telemetry */}
                <div className="col-md-4">
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                        <h6 style={{ fontFamily: 'Orbitron', color: '#9d4edd', marginBottom: '15px', fontSize: '0.8rem', letterSpacing: '0.05em' }}>CORE_TELEMETRY</h6>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Database State:</span>
                                <span style={{ color: '#39ff14', fontWeight: 'bold' }}>LOCAL_COMPASS</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>API Gateway:</span>
                                <span style={{ color: '#00f2fe' }}>http://localhost:3000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>System latency:</span>
                                <span style={{ color: '#00f2fe' }}>{ping} ms</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Active Nodes:</span>
                                <span style={{ color: '#ff007f' }}>{activeUsers}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Col 2: Live Log Feed */}
                <div className="col-md-8">
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                        <h6 style={{ fontFamily: 'Orbitron', color: '#00f2fe', marginBottom: '15px', fontSize: '0.8rem', letterSpacing: '0.05em' }}>REALTIME_TRANSACTION_FEED</h6>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {mockEvents.map(evt => (
                                <div key={evt.id} style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '6px', borderLeft: `3px solid ${evt.color}` }}>
                                    <span style={{ color: '#94a3b8', fontFamily: 'monospace' }}>[{evt.time}]</span>
                                    <span style={{ flex: 1, color: '#f8fafc', fontFamily: 'monospace' }}>{evt.msg}</span>
                                    <span style={{ color: evt.color, fontWeight: 'bold', fontFamily: 'monospace', fontSize: '0.75rem' }}>{evt.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom mini HUD */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px' }}>
                <span>ENCRYPTION: AES_256_ACTIVE</span>
                <span>SECURE FILE_STORAGE: LOCAL_UPLOADS_OK</span>
            </div>
        </div>
    );
};

export default ThreeDStatsConsole;
