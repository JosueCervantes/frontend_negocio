import Header from '../components/header'
import Menu from '../components/Menu'
import Footer from '../components/footer'
export default function Home() {
    return (
        <>
            <div className="wrapper">
                <Menu />
                <div className="main">
                    <Header />
                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3">
                                {`${import.meta.env.VITE_API_TITULO}`}
                            </h1>
                            <div className="row">

                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>    
        </>
    )
}
