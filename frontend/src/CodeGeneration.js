export function SeleniumCode(process,iteration,filepath){
    let code="from selenium import webdriver \n" 
    if(filepath)
    {   
        code+='import pandas as pd \n'
    }   
    code+="driver = webdriver.Chrome(executable_path=r'select your path to webdriver here') \n"
    if(filepath)
    {   
        code+='df = pd.read_csv(\''+filepath+'\') \n'
    }
    if(iteration>1)
    {
        code+="for x in range("+iteration+"): \n"
        process.forEach(function(step){


            if(step._type==="link")
            {
                code+='    driver.get(\''+step.link+'\') \n'
            }
            else if(step._type==="click")
            {   
                code+='    button = driver.find_elements_by_xpath(\''+step.xpath+'\')[0].click()  \n'
                code+='    button\n' 
            }
            else if(step._type==="LoadData")
            {   
                code+=getData(step,true)
                code+='    button = driver.find_elements_by_xpath(\''+step.xpath+'\')[0].clear().send_keys(data) \n'
            }
            
    
        })

    }
    else{
        process.forEach(function(step,index){
            if(step._type==="link")
            {
                code+='driver.get(\''+step.link+'\') \n'
            }
            else if(step._type==="click")
            {   
                code+='button = driver.find_elements_by_xpath(\''+step.xpath+'\')[0].click() \n'
            }
            else if(step._type==="LoadData")
            {   
                code+=getData(step,false)
                code+='button = driver.find_elements_by_xpath(\''+step.xpath+'\')[0].clear().send_keys(data) \n'
            }
    
        })
    }
    
    return code
}


function getData(step,loop){
    var code=""
    if("dataHeader"in step)
    {
        console.log(step)

        loop?
        code+='    data= df[\''+step.dataHeader+'\'][x]\n'
        :
        code+='data= df[\''+step.dataHeader+'\'][0]\n'
        return code
    }
    else {
        loop?
        code="    data = "+step.MenualData+"\n"
        :
        code="data = "+step.MenualData+"\n"
        return code
    }
}