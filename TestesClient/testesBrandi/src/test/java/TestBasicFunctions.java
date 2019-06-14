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
public class TestBasicFunctions {
    
    static WebDriver driver = new ChromeDriver();
    //variavel utilizada para fazer o logout no final do teste
    boolean dologout = true;
    
    public TestBasicFunctions() {
    
       

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
        Thread.sleep(2000);  // Let the user actually see something!
      
    }
    
    @AfterClass
    public static void tearDownClass() {
        driver.quit();
    }
    
    @Before
    public void setUp() {
        
    }
    
    @After
    public void tearDown() {
        //caso a variavel dologout estetja a true, é efetuado o logout selecionando 
        //esta opçao na pagina "IndexFichaRIPage"
        if (dologout) {
        WebElement sair =  driver.findElement(By.className("nav-sair"));
        sair.click();
        } 
    }
    
    
    @Test
    public void TestBasicFunctions() throws Exception {
        
        List<WebElement> nav1 =  driver.findElements(By.className("nav-item"));
        //selecionar a opção "Fichas de R. e I."
        nav1.get(0).click();
        Thread.sleep(2000);
        //selecionar a opção "Interessados"
        nav1.get(1).click();
        Thread.sleep(2000);
        //selecionar a opção "Sobre"
        nav1.get(2).click();
        Thread.sleep(2000);
        //selecionar a opção "Contacto"
        List<WebElement> nav2 =  driver.findElements(By.className("nav-item"));
        nav2.get(3).click();
        Thread.sleep(2000);
        WebElement user = driver.findElement(By.className("sessionName"));
        user.click();
        Thread.sleep(2000);
        //regressar ao menu inicial com o botão "Brandi"
        WebElement home = driver.findElement(By.className("navbar-brand"));
        home.click();
        Thread.sleep(2000);
    }
    
}
