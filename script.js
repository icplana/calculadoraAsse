// Pendiente
// poder utilizar teclado - done
// Poder conservar el ultimo resultado como primer valor de la siguiene operación



document.addEventListener('DOMContentLoaded',() => {


    //DARKMODE
    let htmlTag = document.querySelector('html')
    const lightModeBtn = document.querySelector('#lightMode')
     lightModeBtn.addEventListener('click', () => {
        htmlTag.classList.toggle('dark')
        if( lightModeBtn.textContent === 'Dark') lightModeBtn.textContent = 'Light'
        else if( lightModeBtn.textContent === 'Light') lightModeBtn.textContent = 'Dark'
     })




     //CALC OPERATION LOGIC 
    let firstValue = null
    let secondValue = null
    let sign = null
    let operationLog = []

    const calculate = () => {
        let result
        if ( sign === '+-') result = Number("-" + document.querySelector('#inputText').value)
        if ( sign === '+') result = Number(firstValue) + Number(secondValue)
        if ( sign === '-') result = Number(firstValue) - Number(secondValue)
        if ( sign === '%') result = Number(firstValue) % Number(secondValue)
        if ( sign === '/') result = Number(firstValue) / Number(secondValue)
        if ( sign === 'x') result = Number(firstValue) * Number(secondValue)
        
        document.querySelector('#inputText').setAttribute('placeholder', result)
        operationLog = [...operationLog, {firstValue, sign, secondValue, result}]       
    }

    //SHOW OPERATION AND RESULT ON SCREEN
    const printActualOperation = () => {
        if (firstValue && sign && secondValue){
            let actualOperationSpan = document.querySelector('#actualOperation')
            actualOperationSpan.innerText = firstValue + " " + sign + " " + secondValue
        }
    }

    //OPERATIONLOG REGISTER (ARRAY)
    const updateLog = () => {
        let logList = document.querySelector('.logList')
        logList.innerHTML = null
        operationLog.forEach( each => {
            let li = document.createElement('li')
            li.innerText = each.firstValue + " " + each.sign + " " + each.secondValue + " = " + each.result
            logList.appendChild(li)
        })
    }

    //CLEAN VALUES AFTER OPERATION
    const resetForm = () => {
        firstValue = null
        secondValue = null
        sign = null
        document.querySelector('#inputText').value = null
    }

    //INPUT HANDELING - NUMBERS
    const handleNumberBtn = ( e, number ) => {
        e.preventDefault();        
        document.querySelector('#inputText').value !== null
        ? document.getElementById('inputText').value += number
        : document.getElementById('inputText').value = number          
    }

    //INPUT HANDELING - OPERATORS
    const handleSignBtn = (e, btnSign) => {
        e.preventDefault()  
        if (document.querySelector('#inputText'). value === '') return  
        sign = btnSign       
        if ( firstValue !== null && secondValue === null ) {
            console.log('test')
            secondValue = document.querySelector('#inputText').value
            printActualOperation()
            calculate()       
        }
        if ( firstValue === null ) {
            firstValue = document.querySelector('#inputText').value        
            document.querySelector('#inputText').value = null
            printActualOperation()
        }
       
    }

    //INPUT HANDELING - EQUAL
    const handleEqual = () => {
        secondValue = document.querySelector('#inputText').value
        if ( firstValue === null || secondValue === null || sign === null ) {
            return
        }
        printActualOperation()
        calculate()
        updateLog()
        resetForm()   
        firstValue === operationLog[operationLog.length -1].result
        console.log(operationLog)
    }

    //EVENT HANDELING BUTTONS

        //NUMBER BUTTONS
    let numberBtns = document.querySelectorAll('.numberBtn')
    numberBtns.forEach( btn => {    
        btn.addEventListener('click', (e) => handleNumberBtn(e, e.target.innerText))
    })

        //OPERATORS BUTTONS
    let signBtns = document.querySelectorAll('.signBtn')
    signBtns.forEach( btn => {   
        btn.addEventListener('click', (e) => handleSignBtn(e, e.target.innerText))
    })

        //EQUAL BUTTON
    let equalBtn = document.querySelector('.equalBtn')
    equalBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        handleEqual()   
    })

    //FORM SUBMIT 
    let form = document.querySelector('form')  
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        handleEqual()
    })

    //C BUTTON
    let cBtn = document.querySelector('.btnC')
    cBtn.addEventListener('click', (e) => {
        e.preventDefault()
        firstValue = null
        sign = null
        secondValue = null
        document.querySelector('#inputText').value = null
        document.querySelector('#inputText').removeAttribute('placeholder')
        document.querySelector('#actualOperation').innerText = null        
    })



    
    //EVENT HANDLING TO USE KEYBOARD AND FILTER ONLY NUMBERS TO THE INPUT VALUE
    window.addEventListener('keydown' , (e) => {
        
        // console.log(e)
        document.querySelector('#inputText').focus()
        if ( e.key === '/') handleSignBtn(e, '/')
        else if ( e.key === '*') handleSignBtn(e, 'x')
        else if ( e.key === '+') handleSignBtn(e, '+')
        else if ( e.key === '-') handleSignBtn(e, '-')
        else if ( e.key === 'Enter') handleEqual()
        else if ( e.key !== "0" && 
                  e.key !== "1" && 
                  e.key !== "2" && 
                  e.key !== "4" && 
                  e.key !== "5" && 
                  e.key !== "6" && 
                  e.key !== "7" && 
                  e.key !== "8" && 
                  e.key !== "9" &&
                  e.key !== "Backspace" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowDown" &&
                  e.key !== "ArrowUp" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Delete" &&
                  e.key !== "." ){
            e.preventDefault()
            return        
        }
    })




        // ------------ WHILE DEVELOPING CODE --------------- //



//PRINT OPERATION DATA VALUES BUTTON - JUST FOR DEVELOPING PURPOSES
    // const print = () => {
//         console.log({firstValue, sign, secondValue, operationLog})
//     }

//     document.querySelector('#print').addEventListener('click', print)
})

