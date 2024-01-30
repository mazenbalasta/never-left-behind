const PasswordMatchMessage = (password, repeatPassword) => {
    if (repeatPassword && password !== repeatPassword) {
        return (
            <span
                style={{
                    color: '#ff6666',
                    fontSize: '15px',
                    marginTop: '0px',
                }}
            >
                Passwords do not match
            </span>
        )
    } else if (repeatPassword === password && repeatPassword !== '') {
        return (
            <span
                style={{
                    color: 'green',
                    fontSize: '15px',
                    marginTop: '0px',
                }}
            >
                Passwords match
            </span>
        )
    }
    return null
}

export default PasswordMatchMessage;
