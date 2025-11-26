import Feed from "../components/Feed"

const MyMessages = () => {
    return (
        <>
            <Feed title="Мои сообщения" myOwn={true} />
        </>
    )
}

export default MyMessages