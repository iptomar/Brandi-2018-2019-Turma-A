/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 *
 * @author pm_cr
 */
public class TestEditarTecnica {
    
    static WebDriver driver = new ChromeDriver();
    
    
    public TestEditarTecnica() {
    
       

    }
    
    @BeforeClass
    public static void setUpClass() throws InterruptedException {
        driver.get("brandi.ipt.pt:81");
        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("admin");
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("admin");
        passField.submit();
        Thread.sleep(3000);
    }
    
    @AfterClass
    public static void tearDownClass() {
        driver.quit();
    }
    
    @Before
    public void setUp() {
        driver.get("brandi.ipt.pt:81/fichaRI");
    }
    
    @After
    public void tearDown() {
        
        } 
    
    
    
    
    @Test
    public void TestEditarTecnica() throws InterruptedException {
        Thread.sleep(2000);
        List<WebElement> lista  = driver.findElements(By.className("card"));
        lista.get(1).click();
        Thread.sleep(3000);
        WebElement edit  = driver.findElement(By.className("btn-warning"));
        edit.click();
        Thread.sleep(2000);
        //alteração do campo "Nome"
        WebElement nomeField = driver.findElement(By.className("form-control"));
        nomeField.clear();
        Thread.sleep(2000);
        nomeField.sendKeys("Esdrubal Teste Testado");
        Thread.sleep(2000);
        //confirmar edição
        List<WebElement> editConfirm =  driver.findElements(By.className("mb-4"));
        editConfirm.get(0).click();
        Thread.sleep(2000);
    }
    

}