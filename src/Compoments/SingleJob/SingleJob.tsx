import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
                setJob(response.data.data.job);
                setLoading(false);
                console.log(response.data)   

            } catch (error: any) {
                setError('فشل في جلب البيانات');
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{job?.attributes?.title}</h1>
            <h2>Skills:</h2>
            <ul>
                {job?.relationships?.skills.map((skill) => (
                    <li key={skill.id}>{skill.name}</li>
                ))}
            </ul>
        </div>
    );
}
