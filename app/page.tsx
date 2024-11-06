'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Tweet {
    id: number
    username: string
    postText: string
    postDate: string
}

export default function Component() {
    const [tweets, setTweets] = useState<Tweet[]>([])
    const [username, setUsername] = useState('')
    const [postText, setPostText] = useState('')
    const maxLength = 280

    useEffect(() => {
        fetchTweets()
    }, [])

    const fetchTweets = async () => {
        try {
            const response = await fetch('https://post-it.gyorgy-varga-b81.workers.dev/list')
            if (!response.ok) {
                throw new Error('Failed to fetch tweets')
            }
            const data = await response.json()
            setTweets(data)
        } catch (error) {
            console.error('Error fetching tweets:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (username && postText) {
            try {
                const response = await fetch('https://post-it.gyorgy-varga-b81.workers.dev/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, postText }),
                })
                if (!response.ok) {
                    throw new Error('Failed to create tweet')
                }
                setUsername('')
                setPostText('')
                fetchTweets() // Refresh the tweet list after posting
            } catch (error) {
                console.error('Error creating tweet:', error)
            }
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="min-h-screen bg-white text-black p-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Compose Tweet</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Your Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="bg-white border-gray-300 text-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postText">Tweet Text</Label>
                                <Textarea
                                    id="postText"
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value.slice(0, maxLength))}
                                    required
                                    className="bg-white border-gray-300 text-black resize-none"
                                    maxLength={maxLength}
                                />
                                <div className="text-sm text-gray-500 text-right">
                                    {postText.length}/{maxLength}
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">Tweet</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Recent Tweets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tweets.map((tweet) => (
                                <div key={tweet.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <div className="flex items-start space-x-3">
                                        <Avatar className="w-10 h-10 bg-gray-200 text-black">
                                            <AvatarFallback>{tweet.username[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-bold">{tweet.username}</h3>
                                                <span className="text-gray-500 text-sm">·</span>
                                                <span className="text-gray-500 text-sm">{formatDate(tweet.postDate)}</span>
                                            </div>
                                            <p className="mt-1">{tweet.postText}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
