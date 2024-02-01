import { Carousel, HomeCards } from "./components";
import { services } from "./constants";



function HomePage() {
    const isLoggedIn = true; // Replace this with your actual login logic

    return (
        <main className='relative text-white py-16'>
            <section className='padding'>
                <Carousel />
                <div className="text-center mt-8" >
                    <h1>Welcome to our home page!!!</h1>
                </div>
                <h1 className="text-center underline mt-4">
                    Never Left Behind
                </h1>
                <h1 className="text-center mt-2">Under construction</h1>
                <h2 className="text-center mt-2">Coming on (or before) Feb 12, 2024</h2>
            </section>
            <section className='max-container flex justify-center flew-wrap gap-9'>
                {services.map((service) => (
                    <HomeCards key={service.label} {...service} />
                ))}
            </section>
        </main>
    )
}
export default HomePage
