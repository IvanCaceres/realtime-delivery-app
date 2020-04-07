import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import { useEffect, useState } from 'react';

const useEcho = () => {
    const [echo, setEcho] = useState();

    let csrf
    // get csrf cookie
    document.cookie.split(';').some(
        (item) => {
            if (item.includes('XSRF-TOKEN=')) {
                // https://stackoverflow.com/questions/44652194/laravel-decryptexception-the-payload-is-invalid
                csrf = decodeURIComponent(item.split('=')[1])
            }
        }
    )

    useEffect(() => {
        let echoInstance = new Echo({
            broadcaster: 'pusher',
            key: 'b6387fca6a8c16689601',
            cluster: 'us2',
            forceTLS: true,
            auth: {
                headers: {
                    'X-XSRF-TOKEN': csrf,
                },
            }
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