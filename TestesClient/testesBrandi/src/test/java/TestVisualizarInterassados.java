/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertEquals;
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
public class TestVisualizarInterassados {
        
    static WebDriver driver = new ChromeDriver();
    //variavel utilizada para fazer o logout no final do teste
    boolean dologout = true;
    
    public TestVisualizarInterassados() {
    
       

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
    public void TestVisualizarInterassados() throws Exception {
        //Selecionar a opção "utilizadores"
        List<WebElement> users =  driver.findElements(By.className("nav-link"));
        users.get(1).click();
        Thread.sleep(2000);
        //selecionar o dropdown-item "listar" que se encontra depois de selecionar a opção "utilizadores"
        List<WebElement> options =  driver.findElements(By.className("dropdown-item"));
        //selecionar a opção 4 pois apesar de nao estarem visiveis, a lista "options" irá ter todos (6) os dropdown-items 
        options.get(2).click();
        Thread.sleep(2000);
        //compara se nos encontramos na página que pretendiamos com o teste
        WebElement interessadoTable = driver.findElement(By.className("table"));
        assertEquals(true, interessadoTable.isDisplayed());
    }
    
}
