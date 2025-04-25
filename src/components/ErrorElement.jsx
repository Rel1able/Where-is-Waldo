import { Link } from "react-router-dom"

export default function ErrorElement() {
    return (
        <h1>This page does not exist <Link to="/">Go to the homepage</Link></h1>
    )
}