// Список заявок для клиента
// Пока не понадобится, не буду заявку выносить в компонент
// Заявка:
//      Статус: [Одобрено/Отказано/Нет ответа]
//      Идентификатор
//      Сумма
//      [Если нет результата]
//          Кнопка: Отменить заявку
//
/*
import React from 'react';
import { Card, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Paragraph } = Typography;

// Пример данных для демонстрации
const applications = [
    {
        id: 1,
        status: 'Нет ответа',
        submissionDate: '2023-05-15',
        amount: 150000,
        returnDate: '2024-05-15',
    },
    {
        id: 2,
        status: 'Одобрено',
        submissionDate: '2023-05-10',
        amount: 200000,
        returnDate: '2024-05-10',
    },
    {
        id: 3,
        status: 'Отказано',
        submissionDate: '2023-05-08',
        amount: 100000,
        returnDate: '2024-05-08',
    },
    {
        id: 4,
        status: 'Нет ответа',
        submissionDate: '2023-05-20',
        amount: 120000,
        returnDate: '2024-05-20',
    },
];

const ApplicationCard = ({ application }) => {
    const handleCancel = () => {
        console.log(`Отмена заявки ${application.id}`);
        // Логика отмены заявки
    };

    const extraContent = (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
                style={{
                    color:
                        application.status === 'Одобрено' ? 'green' :
                            application.status === 'Отказано' ? 'red' :
                                'orange',
                    fontWeight: 'bold',
                }}
            >
                {application.status}
            </span>
            {application.status !== 'Одобрено' && application.status !== 'Отказано' && (
                <Button
                    type="primary"
                    icon={<CloseCircleOutlined />}
                    onClick={handleCancel}
                >
                    Отменить
                </Button>
            )}
        </div>
    );

    return (
        <Card
            title={<p style={{ textAlign: 'left' }}>Заявка № {application.id}</p>}
            extra={extraContent} style={{marginBottom: 10, borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left'}}>

                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <strong>Сумма:</strong> {application.amount} ₽
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <strong>Дата подачи:</strong> {moment(application.submissionDate).format('DD.MM.YYYY')}
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <strong>Дата планируемого возврата:</strong> {moment(application.returnDate).format('DD.MM.YYYY')}
                </div>
            </div>
        </Card>
    );
};

const ApplicationsList = () => {
    return (
        <div style={{padding: '24px', width: '900px', margin: '0 auto'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                {applications.map(app => (
                    <ApplicationCard key={app.id} application={app} />
                ))}
            </div>
        </div>
    );
};

export default ApplicationsList;*/

import React, {useState} from 'react';
import {Button, Card} from "antd";
import moment from "moment";
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from "@ant-design/icons";

// TODO Фильтруем заявки на бекенде

const ApplicationCard = ({ application, role = 'employee', onApprove, onReject, onCancel }) => {
    const handleApprove = () => {
        onApprove(application.id);
    };

    const handleReject = () => {
        onReject(application.id);
    };

    const handleCancel = () => {
        onCancel(application.id);
    };

    let extraContent = null;

    if (role === 'user') {
        extraContent = (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                    style={{
                        color:
                            application.status === 'Одобрено' ? 'green' :
                                application.status === 'Отказано' ? 'red' :
                                    'orange',
                        fontWeight: 'bold',
                    }}
                >
                    {application.status}
                </span>
                {application.status !== 'Одобрено' && application.status !== 'Отказано' && (
                    <Button
                        type="primary"
                        icon={<CloseCircleOutlined />}
                        onClick={handleCancel}
                    >
                        Отменить
                    </Button>
                )}
            </div>
        );
    } else if (role === 'employee') {
        extraContent = (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={handleApprove}
                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                >
                    Одобрить
                </Button>
                <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    onClick={handleReject}
                    style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
                >
                    Отказать
                </Button>
            </div>
        );
    }

    return (
        <Card
            title={<p style={{ textAlign: 'left' }}>Заявка № {application.id}</p>} extra={extraContent}
            style={{marginBottom: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',}}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Сумма:</strong> {application.amount} ₽
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Дата подачи:</strong> {moment(application.submissionDate).format('DD.MM.YYYY')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <strong>Дата планируемого возврата:</strong> {moment(application.returnDate).format('DD.MM.YYYY')}
                </div>
            </div>
        </Card>
    );
};
const ApplicationsList = ({ role }) => {

    const [applications, setApplications] = useState([
        {
            id: 1,
            status: 'Нет ответа',
            submissionDate: '2023-05-15',
            amount: 150000,
            returnDate: '2024-05-15',
        },
        {
            id: 2,
            status: 'Одобрено',
            submissionDate: '2023-05-10',
            amount: 200000,
            returnDate: '2024-05-10',
        },
        {
            id: 3,
            status: 'Отказано',
            submissionDate: '2023-05-08',
            amount: 100000,
            returnDate: '2024-05-08',
        },
        {
            id: 4,
            status: 'Нет ответа',
            submissionDate: '2023-05-20',
            amount: 120000,
            returnDate: '2024-05-20',
        },
    ]);

    const handleApprove = (appId) => {
        console.log(`Заявка ${appId} одобрена`);
        setApplications(prevApps => prevApps.map(app =>
            app.id === appId ? { ...app, status: 'Одобрено' } : app
        ));
        // TODO вызываем запрос здесь
    };

    const handleReject = (appId) => {
        console.log(`Заявка ${appId} отклонена`);
        setApplications(prevApps => prevApps.map(app =>
            app.id === appId ? { ...app, status: 'Отказано' } : app
        ));
        // TODO вызываем запрос здесь
    };

    const handleCancel = (appId) => {
        console.log(`Заявка ${appId} отменена`);
        setApplications(prevApps => prevApps.filter(app => app.id !== appId));
        // TODO вызываем запрос здесь
    };

    return (
        <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>

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
        </div>
    );
};

export default ApplicationsList;
