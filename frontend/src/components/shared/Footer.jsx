
const Footer = () => {
    return (
        <footer className="border-t border-t-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl text-left font-bold">Job<span className='text-[#F83002]'>Hunt</span></h2>
                        <p className="text-sm">© {new Date().getFullYear()} JobHunt. All rights reserved.</p>
                    </div>

                    <div className='text-sm text-gray-500 '> &lt; Made with ❤️ by Ankit Nautiyal /&gt; </div>

                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://www.linkedin.com/in/ankit--nautiyal/" className="hover:text-gray-400" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                            </svg>
                        </a>
                
                        <a href="https://github.com/ankit-nautiyal" className="hover:text-gray-400" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.207 11.385c.6.111.793-.26.793-.577v-2.234c-3.338.727-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.834 2.809 1.304 3.495.996.107-.775.419-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.932 0-1.31.468-2.38 1.236-3.22-.124-.305-.535-1.535.117-3.2 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.047.137 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.665.242 2.895.12 3.2.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.624-5.478 5.922.43.372.823 1.102.823 2.222v3.293c0 .32.19.694.8.576A12.001 12.001 0 0024 12c0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                            </svg>
                        </a>

                        <a href="https://facebook.com" className="hover:text-gray-400" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                            </svg>
                        </a>

                        <a href="https://x.com" className="hover:text-gray-400" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer