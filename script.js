// Pendiente
// poder utilizar teclado - done
// Poder conservar el ultimo resultado como primer valor de la siguiene operación



document.addEventListener('DOMContentLoaded',() => {

    let htmlTag = document.querySelector('html')
    const lightModeBtn = document.querySelector('#lightMode')
     lightModeBtn.addEventListener('click', () => {
        htmlTag.classList.toggle('dark')
        if( lightModeBtn.textContent === 'Dark') lightModeBtn.textContent = 'Light'
        else if( lightModeBtn.textContent === 'Light') lightModeBtn.textContent = 'Dark'
     })





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

    const printActualOperation = () => {
        if (firstValue && sign && secondValue){
            let actualOperationSpan = document.querySelector('#actualOperation')
            actualOperationSpan.innerText = firstValue + " " + sign + " " + secondValue
        }
    }

    const updateLog = () => {
        let logList = document.querySelector('.logList')
        logList.innerHTML = null
        operationLog.forEach( each => {
            let li = document.createElement('li')
            li.innerText = each.firstValue + " " + each.sign + " " + each.secondValue + " = " + each.result
            logList.appendChild(li)
        })
    }

    const resetForm = () => {
        firstValue = null
        secondValue = null
        sign = null
        document.querySelector('#inputText').value = null
    }

    const handleNumberBtn = ( e, number ) => {
        e.preventDefault();        
        document.querySelector('#inputText').value !== null
        ? document.getElementById('inputText').value += number
        : document.getElementById('inputText').value = number          
    }

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

    let numberBtns = document.querySelectorAll('.numberBtn')
    numberBtns.forEach( btn => {    
        btn.addEventListener('click', (e) => handleNumberBtn(e, e.target.innerText))
    })

    let signBtns = document.querySelectorAll('.signBtn')
    signBtns.forEach( btn => {   
        btn.addEventListener('click', (e) => handleSignBtn(e, e.target.innerText))
    })

    let equalBtn = document.querySelector('.equalBtn')
    let form = document.querySelector('form')
    console.log(form)
    const handleEqual = () => {
        secondValue = document.querySelector('#inputText').value
        if ( firstValue === null || secondValue === null || sign === null ) {
            // alert('Error');
            return
        }
        printActualOperation()
        calculate()
        updateLog()
        resetForm()   
        firstValue === operationLog[operationLog.length -1].result
        console.log(operationLog)
    }
    equalBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        handleEqual()   
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        handleEqual()
    })


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



    

    window.addEventListener('keydown' , (e) => {
        
        // console.log(e)
        document.querySelector('#inputText').focus()
        if ( e.key === '/') handleSignBtn(e, '/')
        if ( e.key === '*') handleSignBtn(e, 'x')
        if ( e.key === '+') handleSignBtn(e, '+')
        if ( e.key === '-') handleSignBtn(e, '-')
        if ( e.key === 'Enter') handleEqual()
    })




    // const print = () => {
//         console.log({firstValue, sign, secondValue, operationLog})
//     }

//     document.querySelector('#print').addEventListener('click', print)
})

