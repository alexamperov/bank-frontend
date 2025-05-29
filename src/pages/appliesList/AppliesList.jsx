import React, { useState, useEffect } from 'react';
import { Button, Card } from "antd";
import moment from "moment";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import {
    approveApply,
    getAllApplications,
    getOwnApplications, rejectApply/*, approveApplication, rejectApplication, cancelApplication*/
} from '../../api';

const ApplicationCard = ({ application, role, onApprove, onReject, onCancel }) => {
    const handleCancelClick = () => onCancel(application.id);

    const statusColor = {
        'Одобрено': 'green',
        'Отказано': 'red',
        'Нет ответа': 'orange'
    };

    return (
        <Card
            title={<p style={{ textAlign: 'left' }}>Заявка № {application.id}</p>}
            extra={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: statusColor[application.status], fontWeight: 'bold' }}>
                        {application.status}
                    </span>

                    {role === 'employee' && application.status === 'Нет ответа' && (
                        <>
                            <Button
                                type="primary"
                                icon={<CheckCircleOutlined />}
                                onClick={() => onApprove(application.id)}
                                style={{ backgroundColor: '#52c41a' }}
                            >
                                Одобрить
                            </Button>
                            <Button
                                type="primary"
                                icon={<CloseOutlined />}
                                onClick={() => onReject(application.id)}
                                style={{ backgroundColor: '#ff4d4f' }}
                            >
                                Отказать
                            </Button>
                        </>
                    )}
                </div>
            }
            style={{ marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Сумма:</strong> {application.amount} ₽
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Процентная ставка:</strong> {application.percent}%
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Дата подачи:</strong> {moment(application.submissionDate).format('DD.MM.YYYY')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Дата возврата:</strong> {moment(application.returnDate).format('DD.MM.YYYY')}
                </div>
            </div>
        </Card>
    );
};

const ApplicationsList = ({ role }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                if (role === 'user'){
                    const data = await getOwnApplications();
                    const formattedData = data.map(app => ({
                        id: app.id,
                        status: mapStatus(app.status),
                        submissionDate: app.created_at,
                        amount: app.sum,
                        returnDate: app.return_at,
                        percent: app.percent,
                    }));
                    setApplications(formattedData);
                    setLoading(false);
                } else if (role === 'employee'){
                    const data = await getAllApplications();
                    const formattedData = data.map(app => ({
                        id: app.id,
                        status: mapStatus(app.status),
                        submissionDate: app.created_at,
                        amount: app.sum,
                        returnDate: app.return_at,
                        percent: app.percent,
                    }));
                    setApplications(formattedData);
                    setLoading(false);
                }

            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchApplications();
    }, [role]);

    const mapStatus = (apiStatus) => {
        switch (apiStatus) {
            case 'approved': return 'Одобрено';
            case 'rejected': return 'Отказано';
            case 'pending': return 'Нет ответа';
            default: return 'Неизвестный статус';
        }
    };

    const handleApprove = async (appId) => {
        try {
            await approveApply(appId); // Вызываем функцию из api.js
            setApplications(prevApps =>
                prevApps.map(app =>
                    app.id === appId ? { ...app, status: 'Одобрено' } : app
                )
            );
        } catch (error) {
            console.error("Ошибка при одобрении заявки:", error);
        }
    };

    const handleReject = async (appId) => {
        try {
            await rejectApply(appId); // Вызываем функцию из api.js
            setApplications(prevApps =>
                prevApps.map(app =>
                    app.id === appId ? { ...app, status: 'Отказано' } : app
                )
            );
        } catch (error) {
            console.error("Ошибка при отказе заявки:", error);
        }
    };

    const handleCancel = async (appId) => {
        try {
            await cancelApplication(appId);
            setApplications(prev => prev.filter(app => app.id !== appId));
        } catch (error) {
            console.error("Ошибка при отмене:", error);
        }
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {loading && <div>Загрузка...</div>}
            {error && <div>Ошибка: {error.message}</div>}
            {!loading && !error && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {applications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            application={app}
                            role={role}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            onCancel={handleCancel}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsList;