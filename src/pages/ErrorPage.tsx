import {useNavigate} from "react-router";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <>
            <section>
                <h1>Page not found</h1>
                <p>Oops! The page you’re looking for doesn’t exist.</p>

                <button onClick={() => navigate("/")}>Back to main page!</button>

            </section>
        </>
    )
}

export default ErrorPage;