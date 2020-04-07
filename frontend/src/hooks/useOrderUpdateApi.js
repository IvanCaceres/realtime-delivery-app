import { useEffect, useContext, useState } from "react"
import { EchoContext } from './../context/echo'

export default (user, channelCallback = (orderUpdate) => { }) => {
    const echo = useContext(EchoContext)
    const [bookings, setBookings] = useState([])
    useEffect(() => {
        if (!echo)
            return
        if (user) {
            var channel = echo.channel(`private-order.${user.username}_order`);
            channel.listen('.order.update', function (data) {
                channelCallback(data)
            });
        }
    }, [echo, user])
}