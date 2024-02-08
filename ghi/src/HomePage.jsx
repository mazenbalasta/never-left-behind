import { Carousel, HomeCardsWrapper } from "./components";
import { services } from "./constants";



function HomePage() {
    const isLoggedIn = true; // Replace this with your actual login logic

    return (
        <main className='relative text-white py-16'>
            <section className='padding'>
                <Carousel />
                <div className="Chat-text uppercase text-center mt-8 text-[calc(20px+2vmin)]" >
                    <h1>Welcome!!!</h1>
                </div>
                <p className=" text-center text-[calc(1px+2vmin)] text-[rgb(199, 158, 80)] mt-4">
                    Never Left Behind's focus is to enhance the lives of America's veterans by fostering connections 
                    with their community through a range of social and outdoor activities. Established in 2024, this 
                    organization is dedicated to integrating veterans into their local communities, promoting engagement 
                    and well-being through various outdoor and social events.
                </p>
            </section>
            <section className='max-container flex justify-center flew-wrap gap-9 text-[rgb(199,158,80)]'>
                 <HomeCardsWrapper cards={services} />
            </section>
        </main>
    )
}
export default HomePage
