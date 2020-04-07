import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import { useEffect, useState } from 'react';

const useEcho = () => {
    const [echo, setEcho] = useState();
    useEffect(() => {
        let echoInstance = new Echo({
            broadcaster: 'pusher',
            key: 'b6387fca6a8c16689601',
            cluster: 'us2',
            forceTLS: true
        });
        setEcho(echoInstance)
        // echoConsumer(echo);
        return () => {
            echoInstance.disconnect()
        }
    }, [])
    return echo
}
export default useEcho