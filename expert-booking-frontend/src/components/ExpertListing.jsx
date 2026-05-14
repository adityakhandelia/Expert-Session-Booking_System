import React, { useState, useEffect } from "react";
import { getExperts } from "../utils/api";

const ExpertListing = ({ onSelectExpert }) => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchExperts();
    }, [currentPage, search, category]);

    const fetchExperts = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getExperts(currentPage, 5, search, category);
            setExperts(data.experts);
            setTotalPages(data.totalPages);
            
            // Extract unique categories
            if (data.experts && currentPage === 1) {
                const uniqueCategories = [...new Set(data.experts.map(e => e.category))];
                setCategories(uniqueCategories);
            }
        } catch (err) {
            setError(err.message || "Error fetching experts");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleExpertClick = (expertId) => {
        onSelectExpert(expertId);
    };

    return (
        <div className="container">
            <h2>Expert Listing</h2>

            {error && <div className="error">{error}</div>}

            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search expert by name..."
                    value={search}
                    onChange={handleSearch}
                />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading experts...</p>
                </div>
            ) : (
                <>
                    {experts.length === 0 ? (
                        <div className="error">No experts found</div>
                    ) : (
                        <div className="experts-grid">
                            {experts.map(expert => (
                                <div
                                    key={expert._id}
                                    className="expert-card"
                                    onClick={() => handleExpertClick(expert._id)}
                                >
                                    <h3>{expert.name}</h3>
                                    <p><span className="expert-badge">{expert.category}</span></p>
                                    <p><strong>Experience:</strong> {expert.experience} years</p>
                                    <p><strong>Rating:</strong> <span className="rating">★ {expert.rating}</span></p>
                                    <p>{expert.bio}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                ← Previous
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={currentPage === page ? "active" : ""}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExpertListing;
