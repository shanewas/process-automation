export function SeleniumCode(process, iteration, filepath) {
  let code = "from selenium import webdriver \n";
  if (filepath) {
    code += "import pandas as pd \n";
  }
  code +=
    "driver = webdriver.Chrome(executable_path=r'select your path to webdriver here') \n";
  if (filepath) {
    code += "df = pd.read_csv('" + filepath + "') \n";
  }
  if (iteration > 1) {
    code += "for x in range(" + iteration + "): \n";
    process.forEach(function (step) {
      if (step._type === "link") {
        code += "    driver.get('" + step.link + "') \n";
      } else if (step._type === "click") {
        code +=
          "    button = driver.find_element_by_xpath('" +
          step.xpath +
          "')[0].click()  \n";
        code += "    button\n";
      } else if (step._type === "LoadData") {
        code += getData(step, true);
        code +=
          "    button = driver.find_element_by_xpath('" +
          step.xpath +
          "')[0].clear().send_keys(data) \n";
      }
    });
  } else {
    process.forEach(function (step, index) {
      if (step._type === "link") {
        code += "driver.get('" + step.link + "') \n";
      } else if (step._type === "click") {
        code +=
          "button = driver.find_element_by_xpath('" +
          step.xpath +
          "')[0].click() \n";
      } else if (step._type === "LoadData") {
        code += getData(step, false);
        code +=
          "button = driver.find_element_by_xpath('" +
          step.xpath +
          "')[0].clear() \n";
        code +=
          "button = driver.find_element_by_xpath('" +
          step.xpath +
          "')[0].send_keys(data) \n";
      } else if (step._type === "Extract Data") {
        code +=
          "field = driver.find_element_by_xpath('" + step.xpath + "')[0] \n";
        code += "val = field.text \n";
      } else if (step._type === "keyboa     rd") {
        code += "from selenium.webdriver.common.by import By \n";
        code += "from selenium.webdriver.common.keys import keys \n";
        code += "in = str(input()) \n";
        code += 'input.send_keys("in") \n';
      } else if (step._type === "ScreenShot by xpath") {
        code +=
          "button = driver.find_element_by_xpath('" +
          step.xpath +
          "')[0].screenshot(/directory/image.png) \n";
        code += "from PIL import Image, ImageEnhance, ImageOps \n";
        code += "img = Image.open(/image-directory/image.jpg) \n";
        code += "enhancer = ImageEnhance.Brightness(img) \n";
        code += "enhancer.enhance(0.5).save(/directory/image.jpg) \n";
        code += "enhancer = ImageEnhance.Contrast(img) \n";
        code += "enhancer.enhance(0.5).save(/directory/image.jpg) \n";
        code += "gray_image = ImageOps.grayscale(img) \n";
        code += "gray_image.save(/directory/image.jpg) \n";
        code += "invert = ImageOps.grayscale(img) \n";
        code += "invert.save(/directory/image.jpg, quality = 100) \n";
        code += "txt = pie.image_to_string(img) \n";
      } else if (step._type === "ScreenShot") {
        //code+='button = driver.find_element_by_xpath(\''+step.xpath+'\')[0].screenshot(/directory/image.png) \n'
        code += "from PIL import Image, ImageEnhance, ImageOps \n";
        code += "im=Image.open(r'select your path here') \n";
        code += "width, height = im.size \n";
        code += "left=X.axisValue";
        code += "top=Y.axisValue";
        code += "right=width";
        code += "bottom=height";
        code += "enhancer.enhance(0.5).save(/directory/image.jpg) \n";
        code += "enhancer = ImageEnhance.Contrast(img) \n";
        code += "enhancer.enhance(0.5).save(/directory/image.jpg) \n";
        code += "gray_image = ImageOps.grayscale(img) \n";
        code += "gray_image.save(/directory/image.jpg) \n";
        code += "invert = ImageOps.grayscale(img) \n";
        code += "invert.save(/directory/image.jpg, quality = 100) \n";
        code += "txt = pie.image_to_string(img) \n";
      }
    });
  }

  return code;
}

function getData(step, loop) {
  var code = "";
  if ("dataHeader" in step) {
    console.log(step);

    loop
      ? (code += "    data= df['" + step.dataHeader + "'][x]\n")
      : (code += "data= df['" + step.dataHeader + "'][0]\n");
    return code;
  } else {
    loop
      ? (code = "    data = " + step.MenualData + "\n")
      : (code = "data = " + step.MenualData + "\n");
    return code;
  }
}
