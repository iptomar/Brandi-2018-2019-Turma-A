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
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Pedro Tapadas
 */
public class TestarVisualizacaoUsers {
    
    static WebDriver driver = new ChromeDriver();
    
    public TestarVisualizacaoUsers() {
        
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
        Thread.sleep(2000);
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
    public void TestVisualizacaoUsers() throws InterruptedException {
        Thread.sleep(1000);
        //Selecionar a opção "utilizadores"
        List<WebElement> users =  driver.findElements(By.className("dropdown-toggle"));
        users.get(2).click();
        Thread.sleep(2000);
        //selecionar o dropdown-item "listar" que se encontra depois de selecionar a opção "utilizadores"
        List<WebElement> options =  driver.findElements(By.className("dropdown-item"));
        options.get(4).click();
        Thread.sleep(2000);
        //compara se nos encontramos na página que pretendiamos com o teste
        WebElement userList = driver.findElement(By.className("RegisterPage"));
        assertEquals(true, userList.isDisplayed());
}
}
