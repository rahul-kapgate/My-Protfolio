// src/components/GithubProfileSection.jsx
import React, { useEffect, useState } from "react";

export default function GithubProfileSection({
    defaultUsername = "rahul-kapgate",
}) {
    const [usernameInput, setUsernameInput] = useState(defaultUsername);
    const [username, setUsername] = useState(defaultUsername);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!username) return;
                setLoading(true);
                setError("");
                setProfile(null);

                const res = await fetch(`https://api.github.com/users/${username}`);

                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error(`User "${username}" not found on GitHub.`);
                    }
                    throw new Error(`GitHub API error: ${res.status}`);
                }

                const data = await res.json();
                setProfile(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "Unable to load GitHub profile right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [username]);

    const createdYear =
        profile?.created_at ? new Date(profile.created_at).getFullYear() : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = usernameInput.trim();
        if (!trimmed) return;
        setUsername(trimmed);
    };

    return (
        <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                        GitHub snapshot
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                        Quickly peek at a public GitHub profile – repos, followers, and how
                        long they&apos;ve been coding in the open.
                    </p>
                </div>

                {/* Username input */}
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-xs items-center gap-2"
                >
                    <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="GitHub username"
                        className="w-full rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <button
                        type="submit"
                        className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-indigo-400 dark:hover:bg-indigo-500"
                    >
                        View
                    </button>
                </form>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none">
                {loading && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Loading GitHub profile for{" "}
                        <span className="font-mono text-slate-700 dark:text-slate-200">
                            @{username}
                        </span>
                        …
                    </p>
                )}

                {!loading && error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}

                {!loading && !error && profile && (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left: avatar + basic info */}
                        <div className="flex items-center gap-4">
                            <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                                <div className="absolute inset-0 rounded-full bg-emerald-500/40 blur-md" />
                                <img
                                    src={profile.avatar_url}
                                    alt={profile.login}
                                    className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                                    loading="lazy"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                                        {profile.name || profile.login}
                                    </p>
                                    <a
                                        href={profile.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs rounded-full border border-slate-200 px-2 py-0.5 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-emerald-400 dark:hover:text-emerald-300 transition-colors"
                                    >
                                        @{profile.login} ↗
                                    </a>
                                </div>
                                {profile.bio && (
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
                                        {profile.bio}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    {createdYear && <span>On GitHub since {createdYear}</span>}
                                    {profile.location && <span>📍 {profile.location}</span>}
                                    {profile.blog && (
                                        <a
                                            href={
                                                profile.blog.startsWith("http")
                                                    ? profile.blog
                                                    : `https://${profile.blog}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline underline-offset-2 hover:text-emerald-600 dark:hover:text-emerald-300"
                                        >
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center text-xs sm:text-sm">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                    Repos
                                </p>
                                <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                                    {profile.public_repos}
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                    Followers
                                </p>
                                <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                                    {profile.followers}
                                </p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                                    Following
                                </p>
                                <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">
                                    {profile.following}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
