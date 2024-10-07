import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RelatedCard = React.memo((props: any) => {
    const { Jobs, Skills, ATTR } = props;
    const [jobIDs, setJobIDs] = useState<string[]>([]);
    const [skillIDs, setSkillIDs] = useState<string[]>([]);

    const [JobsData, setJobsData] = useState<any[]>([]);
    const [SkillsData, setSkillsData] = useState<any[]>([]);
    // const [JobsData , setJobsData] = useState<any[]>([]);



    useEffect(() => {
        const newJobIDs = Jobs.flatMap((jobArray: any[]) =>
            jobArray.map((job: any) => job.id)
        );
        const newSkillIDs = Skills.flatMap((skillArray: any[]) =>
            skillArray.map((skill: any) => skill.id)

        );
        setJobIDs(newJobIDs);
        setSkillIDs(newSkillIDs);
    }, [Jobs, Skills, ATTR]);

    // Get Related Jobs 
    useEffect(() => {
        const fetchJobs = async () => {
            if (jobIDs) {
                const JobsPromises = jobIDs.map((jobIDs: string) =>
                    axios.get(`https://skills-api-zeta.vercel.app/job/${jobIDs}`)
                );
                const JobsResponses = await Promise.all(JobsPromises);
                const skillNames = JobsResponses.map(response => response.data.data.job.attributes.title);
                setJobsData(skillNames);
            }
        };
        fetchJobs();
    }, [jobIDs]);


    // Get Related Skills 
    useEffect(() => {
        const fetchSkills = async () => {
            if (Skills) {
                const skillPromises = skillIDs.map((skill: any) =>
                    axios.get(`https://skills-api-zeta.vercel.app/skill/${skill}`)
                );
                const skillResponses = await Promise.all(skillPromises);
                const skillNames = skillResponses.map(response => response.data.data.skill.attributes.name);
                setSkillsData(skillNames);

            }
        };

        fetchSkills();
    }, [skillIDs, Skills]);











    return (
        <div>
            <h2>Related Jobs:</h2>
            <ul>
                {JobsData.map((job, index) => (
                    <li key={index}>{job}</li>
                ))}
            </ul>

            <h2>Related Skills:</h2>
            <ul>
                {SkillsData.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
});

export default RelatedCard;
