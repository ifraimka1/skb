function PageContent({ children, id = "" }) {
    return (
        <div className="content" id={id}>
            { children }
        </div>
    );
}

export default PageContent;