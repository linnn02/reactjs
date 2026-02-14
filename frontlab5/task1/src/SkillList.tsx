import type { Skill } from "./types";

interface SkillListProps {
    skills: Skill[];
}

const SkillList = ({ skills }: SkillListProps) => {
    return (
        <ul>
            {skills.map((skill) => (
                <li key={skill.id}>
                    {skill.name} - {skill.level}
                    </li>))}
                </ul>);
};

export default SkillList;