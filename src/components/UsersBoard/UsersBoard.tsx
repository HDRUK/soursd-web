import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "../Droppable";
import Card from "../UsersBoardCard";

export const newIssuesList = [
  {
    id: "1",
    customer_name: "David",
    title: "How can I access my account?",
    date: "25th December, 2025",
    status: "new",
  },
];

//👇🏻 default list of open issues
export const openIssuesList = [
  {
    id: "2",
    customer_name: "David",
    title: "My password is not working and I need it fixed ASAP",
    date: "20th July, 2023",
    status: "open",
  },
  {
    id: "3",
    customer_name: "David",
    title: "First Issues",
    date: "5th February, 2023",
    status: "open",
  },
  {
    id: "4",
    customer_name: "David",
    title: "First Issues",
    date: "2nd March, 2023",
    status: "open",
  },
  {
    id: "5",
    customer_name: "David",
    title:
      "What is wrong with your network? I can't access my profile settings account",
    date: "5th August, 2024",
    status: "open",
  },
];

//👇🏻 default list of closed issues
export const closedIssuesList = [
  {
    id: "6",
    customer_name: "David",
    title: "First Issues",
    date: "2nd March, 2023",
    status: "closed",
  },
  {
    id: "7",
    customer_name: "Jeremiah Chibuike",
    title:
      "What is wrong with your network? I can't access my profile settings account",
    date: "5th August, 2024",
    status: "closed",
  },
  {
    id: "8",
    customer_name: "David",
    title: "First Issues",
    date: "2nd March, 2023",
    status: "closed",
  },
  {
    id: "9",
    customer_name: "David",
    title:
      "What is wrong with your network? I can't access my profile settings account",
    date: "5th August, 2024",
    status: "closed",
  },
  {
    id: "10",
    customer_name: "David",
    title:
      "What is wrong with your network? I can't access my profile settings account",
    date: "5th August, 2024",
    status: "closed",
  },
];

export default function UsersBoard({ children, initialData }) {
  const [data, setData] = useState(initialData);

  const pruneIssue = (id: string) => {
    let prunedData = { ...data };

    Object.keys(prunedData).map((key: string) => {
      prunedData = {
        ...prunedData,
        [key]: prunedData[key].filter(issue => issue.id !== id),
      };
    });

    return prunedData;
  };

  const moveIssue = (id: string, active: any) => {
    return setData({
      ...pruneIssue(active.id),
      [id]: [
        ...data[id],
        {
          ...active.data.current,
          status: id,
        },
      ],
    });
  };

  const handleDragEnd = event => {
    const { active, over } = event;

    if (over.id && over.id !== active.data.current.status)
      moveIssue(over.id, active);
  };

  console.log("data", data);

  return <DndContext onDragEnd={handleDragEnd}>{children(data)}</DndContext>;
}
