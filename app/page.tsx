'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Tweet {
    id: number
    name: string
    handle: string
    text: string
    timestamp: string
}

const initialTweets: Tweet[] = [
    {
        id: 1,
        name: "Elon Musk",
        handle: "@elonmusk",
        text: "Cybertruck is built for both land and sea",
        timestamp: "2h ago"
    },
    {
        id: 2,
        name: "MKBHD",
        handle: "@MKBHD",
        text: "The best smartphone camera is the one you have with you",
        timestamp: "5h ago"
    },
    {
        id: 3,
        name: "Paul Graham",
        handle: "@paulg",
        text: "Writing is nature's way of letting you know how sloppy your thinking is",
        timestamp: "1d ago"
    }
]

export default function Component() {
    const [tweets, setTweets] = useState<Tweet[]>(initialTweets)
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const maxLength = 280

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && text) {
            const newTweet: Tweet = {
                id: Date.now(),
                name,
                handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
                text,
                timestamp: 'Just now'
            }
            setTweets([newTweet, ...tweets])
            setName('')
            setText('')
        }
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
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="bg-white border-gray-300 text-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="text">Tweet Text</Label>
                                <Textarea
                                    id="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                                    required
                                    className="bg-white border-gray-300 text-black resize-none"
                                    maxLength={maxLength}
                                />
                                <div className="text-sm text-gray-500 text-right">
                                    {text.length}/{maxLength}
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
                                            <AvatarFallback>{tweet.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-bold">{tweet.name}</h3>
                                                <span className="text-gray-500 text-sm">{tweet.handle}</span>
                                                <span className="text-gray-500 text-sm">·</span>
                                                <span className="text-gray-500 text-sm">{tweet.timestamp}</span>
                                            </div>
                                            <p className="mt-1">{tweet.text}</p>
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
