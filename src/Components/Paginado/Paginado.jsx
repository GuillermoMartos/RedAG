import React from 'react';


function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav >
            {pageNumbers && pageNumbers.map(n => {
                return (
                    <button className="button" active key={n} onClick={() => paginado(n)}> {n} </button>
                )
            })}
        </nav>

    )

};

export default Paginado;