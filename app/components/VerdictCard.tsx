"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { avatar } from "../data/avatar";
import { Heart } from "lucide-react";

type Verdict = {
  confession_id: string;
  question: string;
  verdict: string;
  explanation: string;
  confession: string;
  likes: number;
};

type AvatarItem = {
  name: string;
  avatar: string;
};

export default function VerdictCard() {
  const [confessWithAvatar, setConfessWithAvatar] = useState<
    (Verdict & AvatarItem)[]
  >([]);

  function randomize<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  useEffect(() => {
    const fetchVerdict = async () => {
      const { data, error } = await supabase
        .from("confessions")
        .select(
          "confession_id, question, verdict, explanation, likes, confession"
        );

      if (error) console.log(error);

      if (data) {
        const merged = data.map((item) => {
          const randomAvatar = randomize(avatar);
          return { ...item, ...randomAvatar };
        });

        setConfessWithAvatar(merged);
      }
    };

    fetchVerdict();
  }, []);

  const handleLike = async (id: string, currentLikes: number) => {
    const { error } = await supabase
      .from("confessions")
      .update({ likes: currentLikes + 1 })
      .eq("confession_id", id);

    if (error) {
      console.log(error);
      return;
    }

    setConfessWithAvatar((prev) =>
      prev.map((item) =>
        item.confession_id === id
          ? { ...item, likes: item.likes + 1 }
          : item
      )
    );
  };

  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-x-4 gap-y-6 mt-10 px-5 md:px-10">
        {confessWithAvatar.map((confess) => (
          <div
            key={confess.confession_id}
            className="bg-white border-2 rounded-xl px-5 py-4"
          >
            <div className="flex justify-between items-end md:items-center mb-3 gap-x-4">
              <div className="flex items-center gap-3">
                <img
                  src={confess.avatar}
                  alt={confess.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{confess.name}</p>
                  <h1 className="font-semibold text-sm text-[#FF1592]">
                    {confess.question}
                  </h1>
                </div>
              </div>
              <p
                className={`text-white px-2 rounded-lg w-fit text-sm md:text-lg font-bold ${
                  confess.verdict === "GUILTY"
                    ? "bg-[#FF1592]"
                    : "bg-[#F5BD1E]"
                }`}
              >
                {confess.verdict}
              </p>
            </div>

            <div className="flex flex-col gap-y-1">
              <p className="text-black text-lg font-semibold">
                {confess.confession}
              </p>
              <p className="text-gray-500">{confess.explanation}</p>

                <div className="flex justify-end">
                    <button
                        className="bg-[#F5BD1E] hover:bg-[#f9de93] flex items-center gap-x-2 rounded-full px-4 py-2 text-white"
                        onClick={() => handleLike(confess.confession_id, confess.likes)}
                    >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-bold">{confess.likes}</span>
                    </button>
                </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
