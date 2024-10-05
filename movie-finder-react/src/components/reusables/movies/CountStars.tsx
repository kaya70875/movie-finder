export default function CountStars({ rating }: { rating: number }) {
    const stars: JSX.Element[] = [];
    const numStars = Math.round(rating / 2); // Convert 0-10 rating to 1-5 stars

    for (let i = 0; i < numStars; i++) {
        stars.push(
            <svg key={i} width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0L20.944 10.5321L32 12.2313L24 20.4248L25.888 32L16 26.5321L6.112 32L8 20.4248L0 12.2313L11.056 10.5321L16 0Z" fill="#00C030" />
            </svg>
        );
    }

    return <div style={{display : 'flex' , gap : '.25rem'}}>{stars}</div>;
}
