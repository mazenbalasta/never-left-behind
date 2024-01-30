function HomePage() {
    const isLoggedIn = true; // Replace this with your actual login logic

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <div>
                        <h1>Welcome to our home page!!!</h1>
                    </div>
                    <h1 className="justify-center underline">
                        Never Left Behind
                    </h1>
                    <h1>Under construction</h1>
                    <h2>Coming on (or before) Feb 12, 2024</h2>
                </header>
            </div>
            {isLoggedIn && (
                <div>
                    Hello Logged in user!
                </div>
            )}
        </div>
    )
}
export default HomePage
