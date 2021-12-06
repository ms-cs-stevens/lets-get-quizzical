import React from 'react'

function FAQ({faq, index, toggleFAQ}) {
    return (
        <div
            className= {"faq "+ (faq.open ? 'open' : '')}
            key={index}
            onClick={() => toggleFAQ(index)}
        >
            <div className="faq-question">
                Q. {faq.question}
            </div>
            <div className="faq-answer">
            <hr />
                {faq.answer}
            </div>

        </div>
    )
}

export default FAQ
