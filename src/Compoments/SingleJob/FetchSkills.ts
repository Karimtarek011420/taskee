import axios from 'axios';
interface Skill {
    id: string;
    attributes: {
        name: string;
    };
    relationships: {
        jobs: JobType[];
        skills: SkillType[];
    };
}
interface SkillType {
    id: string;
    attributes: {
        name: string;
    };
    relationships: {
        jobs: JobType[];
        skills: SkillType[];
    };
}

interface JobType {
    id: string;
    attributes: {
        title: string;
    };
}

export const fetchSkillsData = async (
    skills: Skill[],
    setSkills: React.Dispatch<React.SetStateAction<string[]>>,
    setATTR: React.Dispatch<React.SetStateAction<any[]>>,
    setJobsID: React.Dispatch<React.SetStateAction<JobType[][]>>,
    setSkillsID: React.Dispatch<React.SetStateAction<SkillType[][]>>
) => {
    if (skills.length) {
        try {
            const skillPromises = skills.map((skill: Skill) =>
                axios.get(`https://skills-api-zeta.vercel.app/skill/${skill.id}`)
            );
            const skillResponses = await Promise.all(skillPromises);
            const skillNames = skillResponses.map(
                (response) => response.data.data.skill.attributes.name
            );
            setSkills(skillNames);

            setATTR(skillResponses.map((response) => response.data.data.skill.attributes));
            setJobsID(
                skillResponses.map((response) => response.data.data.skill.relationships.jobs)
            );
            setSkillsID(
                skillResponses.map((response) => response.data.data.skill.relationships.skills)
            );
        } catch (error) {
            console.error('Error fetching skills data:', error);
        }
    }
};
