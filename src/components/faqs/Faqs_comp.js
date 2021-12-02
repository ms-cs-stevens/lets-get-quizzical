import "./FAQ_css.css"
import React, {useState} from 'react';
import Header from './FAQ_Header';
import FAQ from './FAQ';

function Faqs() {
  const [faqs, setfaqs] = useState([
    {
      question: 'Question 1',
      answer: 'Answer 1',
      open: true
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
      open: false
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
      open: false
    }
  ]);

  const toggleFAQ = index =>{
    setfaqs(faqs.map( (faq,i) => {
      if(i === index){
        faq.open = !faq.open
      }else{
        faq.open = false;
      }

      return faq;
    }))
  }
  return (
    <div className="App">
      <Header />
      <div className="faqs">
        {faqs.map( (faq,i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ}/>
                              )
                  )
        }
      </div>
    
    </div>
  );
}

export default Faqs;