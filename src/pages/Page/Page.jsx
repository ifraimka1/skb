function Page({ title, children }) {
    return (
        <>
            <header className="header">
                <h1>{title}</h1>
            </header>
            <div className="content">
                {children}
            </div>
        </>
    );
}

export default Page;