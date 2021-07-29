import Layout from '../components/Layout';
import CreateGroupComponent from'../components/CreateGroup.js';
import {useState} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar.js';


export default function CreateGroup() {
  const [groups, setGroups] = useState("");
  const router = useRouter();

  const handleSave = async (newGroup) => {
    if(newGroup) {
      const url = `${process.env.NEXT_PUBLIC_HOSTNAME}api/groups/${router.query.name}`;
      const response = await fetch(url,
          {
              method: 'POST',
              body: JSON.stringify(newGroup),
              headers: new Headers({ 'Content-type': 'application/json' }),
          }
      )

      if (!response.ok) {
          throw new Error(response.statusText);
      }

      const newGroupResponse = await response.json();
      const newGroupData = groups.concat(newGroupResponse);
      setGroups(newGroupData);
    }
  }

  const navbarButtonClicked = (button) => {
    if (button === 'home') {
        router.push(`/`);
    } else if (button === 'forward') {
        router.push(`/`);
    } else if (button === 'previous') {
        router.push(`/`);
    }
  }

  return (
    <Layout>
      <div>
        <Navbar handleClick={navbarButtonClicked} />
      </div>
      <div>
        <CreateGroupComponent select={handleSave}/>
      </div>
    </Layout>
  
);
  }
