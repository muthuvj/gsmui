import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Navbar from '../../components/navbar/Navbar.js'
import Peer from 'simple-peer'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Onlineclass = () => {
    const users = useSelector((state) => state.user.student._id)
    const socket = useRef()
    const myvideo = useRef()
    const othervideo = useRef()
    const [roomid, setRoomid] = useState('')
    const [user, setUser] = useState([])
    const [stream, setStream] = useState(null)

    useEffect(() => {
        socket.current = io('ws://localhost:8000')
    }, [])

    useEffect(() => {
        socket.current.on('room', (room) => {
            setRoomid(room)
        })
    }, [socket])

    useEffect(() => {
        socket.current.on('answered', (signal) => {
            console.log('answred', signal)
        })
    }, [socket])

    useEffect(() => {
        socket.current.on('alluser', (data) => {
            data.map((u) => {
                CreatePeer(u.id, socket.current.id)
            })
        })
    }, [socket])

    useEffect(() => {
        socket.current.on('accept', (callerid, signal) => {
            console.log('init', signal)
            Adduser(callerid, signal)
        })
    }, [socket])

    const CreatePeer = (usertocall, callerid) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        })

        peer.on('signal', (data) => {
            socket.current.emit('initcall', usertocall, callerid, data)
        })

        peer.on('stream', (stream) => {
            const video = document.createElement('video')
            video.srcObject = stream
            video.play()
            othervideo.current.append(video)
        })

        socket.current.on('answered', (signal) => {
            peer.signal(signal)
        })
    }

    const Adduser = (callerid, signal) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        })

        peer.on('signal', (data) => {
            socket.current.emit('receivedcall', callerid, data)
        })

        peer.on('stream', (stream) => {
            const video = document.createElement('video')
            video.srcObject = stream
            video.play()
            othervideo.current.append(video)
        })

        peer.signal(signal)
    }

    const Room = () => {
        socket.current.emit('create-room', uuidv4(), users)
    }

    const Join = () => {
        socket.current.emit('join-room', roomid, users)

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream)
                const video = document.createElement('video')
                video.muted = true
                video.srcObject = stream
                video.play()
                myvideo.current.append(video)
            })
    }

    return (
        <>
            <Navbar />
            <div>
                <div className="videos" ref={myvideo}></div>
                <div className="othervideo" ref={othervideo}></div>

                <button onClick={Room}>Create</button>

                <Link to={`/onlineclass/${roomid}`}>
                    <button onClick={Join}>join</button>
                </Link>
            </div>
        </>
    )
}

export default Onlineclass
