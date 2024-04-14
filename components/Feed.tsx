'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { Tpost } from '@/utils/types'

const PromptCardList = ({
    data,
    handleTagClick
}: { data: Tpost[]; handleTagClick: (tag: string) => void }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post: Tpost) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [post, setPost] = useState<Tpost[]>([])

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [searchedResults, setSearchedResults] = useState<Tpost[]>([]);

    useEffect(() => {
        (async () => {
            const res = await fetch('api/prompt');
            const data = await res.json();
            setPost(data);
        })();

    }, [])

    const filterPrompts = (searchtext: string) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

        return post.filter(
            (item: Tpost) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        clearTimeout(searchTimeout!);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName: string) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder='search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                />
            </form>

            {
                searchText ?
                    <PromptCardList
                        data={searchedResults}
                        handleTagClick={handleTagClick}
                    />
                    : <PromptCardList
                        data={post}
                        handleTagClick={handleTagClick}
                    />
            }

        </section>
    )
}

export default Feed