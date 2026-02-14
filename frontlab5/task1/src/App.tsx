import UserCard from "./UserCard";
import SkillList from "./SkillList";
import type { User, Skill } from "./types";

function App() {
  const user: User = {
    name: "Lina",
    email: "asda@sd.com",
    age: 18,
  };

  const skills: Skill[] = [
    { id: 1, name: "React", level: "Beginner" },
    { id: 2, name: "TypeScript", level: "Intermediate" },
    { id: 3, name: "Git", level: "Expert" },
  ];

  return (
    <div>
      <UserCard user={user} isActive={true}>
        <p><b>Status:</b> Active student</p></UserCard>
        <h3>Skills</h3>
    <SkillList skills={skills} />
    </div>
  );
}

export default App;