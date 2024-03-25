import { fetchUsers } from '@/lib/fetchers';
import { useAllUsers } from '@/store/userStore';
import { userProps } from '@/types';
import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import ChatItem from './ChatItem';
import { io } from "socket.io-client";
import{URL} from "@/Url";

function ChatList({ mySelf }: { mySelf: userProps }) {
  const { users, setUsers } = useAllUsers(
    (state: any) => ({ users: state.users, setUsers: state.setUsers }),
    shallow
  );

  const socket = io(URL);

  useEffect(() => {
    const handleNewUser = () => {
      fetchUsers(mySelf, setUsers);
    };

    socket.on("new-user", handleNewUser);

    return () => {
      socket.off("new-user", handleNewUser);
    };
  }, [mySelf, setUsers, socket]); // Include mySelf, setUsers, and socket in the dependency array

  useEffect(() => {
    fetchUsers(mySelf, setUsers);
  }, [mySelf, setUsers]); // Include mySelf and setUsers in the dependency array

  return (
    <ul className='my-5 flex flex-col'>
      {/* ChatItem */}
      {
        users ? (
          users?.reverse()?.map((user:any) => <ChatItem key={user._id} user={user} />)
        ): (
          <span className='loading loading-ring w-16'></span>
        )
      }
    </ul>
  );
}

export default ChatList;
