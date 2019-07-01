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
public class TesteCriarUser {
    
    static WebDriver driver = new ChromeDriver();
    
    public TesteCriarUser() {
        
    }
    
    @BeforeClass
    public static void setUpClass() throws InterruptedException {
        driver.manage().window().maximize();
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
    public void TesteCriarUser() throws InterruptedException {
        //Selecionar a opção "utilizadores"
        List<WebElement> users =  driver.findElements(By.className("nav-link"));
        users.get(2).click();
        Thread.sleep(5000);
        //selecionar o dropdown-item "listar" que se encontra depois de selecionar a opção "utilizadores"
        List<WebElement> options =  driver.findElements(By.className("dropdown-item"));
        //selecionar a opção 4 pois apesar de nao estarem visiveis, a lista "options" irá ter todos (6) os dropdown-items 
        options.get(5).click();
        Thread.sleep(2000);
        //compara se nos encontramos na página que pretendiamos com o teste
        WebElement user = driver.findElement(By.id("user"));
        user.sendKeys("TestUserx");
        WebElement email = driver.findElement(By.id("email"));
        email.sendKeys("testuserx@mail.pt");
        WebElement pass = driver.findElement(By.id("pass"));
        pass.sendKeys("123qwe#");
        WebElement passConfirmer = driver.findElement(By.id("passConfirmer"));
        passConfirmer.sendKeys("123qwe#");
        WebElement DDLRoles = driver.findElement(By.id("DDLRoles"));
        DDLRoles.click();
        
        WebElement btnCriar = driver.findElement(By.className("btn-success"));
        btnCriar.click();
        
        
        Thread.sleep(5000);
}
}