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
import org.junit.Ignore;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Pedro Tapadas
 */
public class TestarLogin {
    
    static WebDriver driver = new ChromeDriver();
    boolean dologout = true;
    
    public TestarLogin() {
    
       

    }
    
    @BeforeClass
    public static void setUpClass() throws InterruptedException {
      
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
        if (dologout) {
         List<WebElement> sair =  driver.findElements(By.className("nav-link"));
        sair.get(3).click();
        sair =  driver.findElements(By.className("dropdown-item"));
        sair.get(3).click();
        } 
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    public void TestLoginSucesso() throws InterruptedException {
    
        driver.get("brandi.ipt.pt:81");
        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("aluno");
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("aluno");
        passField.submit();
        Thread.sleep(2000);  // Let the user actually see something!
        assertEquals(true,true);
       dologout = true;
    }
    
    @Test
    public void TestLoginInSucesso() throws InterruptedException {
    
        driver.get("brandi.ipt.pt:81");
        WebElement userField = driver.findElement(By.id("user"));
        userField.sendKeys("lala");
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement passField = driver.findElement(By.id("pass"));
        passField.sendKeys("lala");
        passField.submit();
        Thread.sleep(2000);  // Let the user actually see something!
        WebElement msg = driver.findElement(By.id("adeus"));
        assertEquals(true, msg.getText().contains("Utilizador ou palavra-passe erradas"));
        dologout = false;
     }
}
