'use client';

import { useEffect, useState } from "react";
import Collapsible from "../collaspsible";
import LayoutEl from "../layout";
import { topicsData as jsonTopics } from "../josnData";


interface SubTopic {
  name: string;
  leetCode: string;
  youtube: string;
  article: string;
  level: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'Done' | 'Pending';
}

interface SubTopicsTableProps {
  subTopics: SubTopic[];
  title: string,
  // onStatusChange: (allDone: boolean) => void;
}

// ✅ Map JSON to strictly typed SubTopic array
const topicsData: { title: string; status: string; subTopics: SubTopic[] }[] =
  jsonTopics.map(topic => ({
    ...topic,
    subTopics: topic.subTopics.map(t => ({
      ...t,
      level: t.level.toUpperCase() as "EASY" | "MEDIUM" | "HARD",
      status: t.status === "Done" ? "Done" : "Pending",
    })),
  }));

const SubTopicsTable: React.FC<SubTopicsTableProps> = ({ subTopics, title,
  // onStatusChange
}) => {
  const [topics, setTopics] = useState<SubTopic[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(title);
      return stored ? JSON.parse(stored) : subTopics;
    }
    return subTopics;
  });

  useEffect(() => {
    localStorage.setItem(title, JSON.stringify(topics));
  }, [topics]);

  const handleCheckboxChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setTopics(prev =>
      prev.map((topic, i) =>
        i === index ? { ...topic, status: e.target.checked ? "Done" : "Pending" } : topic
      )
    );
  };

  return (
    <div className="flex justify-center p-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 px-6 py-4 border-b">
          Sub Topics
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400">
            <thead>
              <tr className="text-gray-700 text-[13px]">
                <th className="px-4 py-2 text-left text-nowrap">Name</th>
                <th className="px-4 py-2 text-left text-nowrap">LeetCode Link</th>
                <th className="px-4 py-2 text-left text-nowrap">YouTube Link</th>
                <th className="px-4 py-2 text-left text-nowrap">Article Link</th>
                <th className="px-4 py-2 text-left text-nowrap">Level</th>
                <th className="px-4 py-2 text-left text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic, index) => (
                <tr key={index} className="border-t border-gray-500 hover:bg-blue-50 transition-colors text-[14px]">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={topic.status === "Done"}
                      onChange={e => handleCheckboxChange(index, e)}
                      className="accent-blue-500 cursor-pointer"
                    />
                    <span className="font-medium text-gray-800 text-nowrap">{topic.name}</span>
                  </td>
                  <td className="px-4 py-2">
                    <a href={topic.leetCode} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-nowrap">
                      Practise
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a href={topic.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-nowrap">
                      Watch
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a href={topic.article} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-nowrap">
                      Read
                    </a>
                  </td>
                  <td className="px-4 py-2 font-semibold text-[12px]">{topic.level}</td>
                  <td className="text-center !w-[100px]">
                    <span className="px-2 py-1 rounded-full text-[12px] font-semibold">{topic.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const Topics = () => {
  const [allDoneMap, setAllDoneMap] = useState<Record<string, boolean>>({});
  console.log(allDoneMap, "all")
  useEffect(() => {
    const result: Record<string, boolean> = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key!);

      if (!value || !key) continue;

      try {
        const parsed = JSON.parse(value);

        // agar value array hai (subtopics)
        if (Array.isArray(parsed)) {
          const allDone = parsed.every((item) => item.status === "Done");
          result[key] = allDone;
        }
        // agar single object
        else if (parsed.status) {
          result[key] = parsed.status === "Done";
        }
      } catch {
        result[key] = false; // agar parse fail ho jaye
      }
    }

    setAllDoneMap(result);
  }, []);

  const handleSubTopicStatusChange = (title: string, allDone: boolean) => {
    setAllDoneMap(prev => ({ ...prev, [title]: allDone }));
  };
  return (
    <LayoutEl>
      <div className="flex justify-center">
        <div className="min-h-screen p-10 space-y-4 w-full max-w-4xl">
          <h1 className="text-2xl font-semibold mb-4">Topics Demo</h1>
          {topicsData.map((topic, index) => {
            // ✅ Determine status based on allDoneMap
            const status = allDoneMap[topic.title] ? "Done" : "Pending";
            return (
              <Collapsible
                key={index}
                title={topic.title}
                status={status}
                defaultOpen={index === 0}
              >
                <SubTopicsTable
                  subTopics={topic.subTopics}
                  title={topic.title}
                // onStatusChange={(allDone) => handleSubTopicStatusChange(topic.title, allDone)}
                />
              </Collapsible>
            );
          })}
        </div>
      </div>
    </LayoutEl>
  );
};

export default Topics;
