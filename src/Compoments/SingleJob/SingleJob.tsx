import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./SingleJob.css";

interface Skill {
    id: string;
    name: string;
}

interface Job {
    relationships: {
        skills: Skill[];
    };
    attributes?: {
        title: string;
    };
}

export default function SingleJob() {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [skills, setSkills] = useState<string[]>([]); // حالة لتخزين المهارات

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
                setJob(response.data.data.job);
                setLoading(false);
                console.log(response.data.data.job);
            } catch (error: any) {
                setError('فشل في جلب البيانات');
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    useEffect(() => {
        const fetchSkills = async () => {
            if (job) {
                const skillPromises = job.relationships.skills.map((skill: Skill) =>
                    axios.get(`https://skills-api-zeta.vercel.app/skill/${skill.id}`)
                );
                const skillResponses = await Promise.all(skillPromises);
                const skillNames = skillResponses.map(response => response.data.data.skill.attributes.name);
                setSkills(skillNames); // تخزين أسماء المهارات في الحالة
            }
        };

        fetchSkills();
    }, [job]); // يعتمد على job للتحديث

    if (loading) {
        return <div>Loading...</div>; // عرض حالة التحميل
    }

    if (error) {
        return <div>{error}</div>; // عرض رسالة الخطأ
    }

    return (
        <div className='SJob-Container'>
            <h1>{job?.attributes?.title}</h1>
            <div>
                <h2>Related Skills:</h2>
                <ul>
                    {skills.map((skillName, index) => (
                        <li key={index}>{skillName}</li> // عرض أسماء المهارات
                    ))}
                </ul>
            </div>
        </div>
    );
}
