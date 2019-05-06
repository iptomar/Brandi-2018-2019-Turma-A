/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
 * @author Pedro
 */
public class TestarCriarObra {

    static WebDriver driver = new ChromeDriver();

    public TestarCriarObra() {
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
    }

    @Before
    public void setUp() {
        driver.get("brandi.ipt.pt:81/fichaRI");
    }

    @After
    public void tearDown() {
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    public void testarCriarObra() {
    
    
    }
    
    
}
