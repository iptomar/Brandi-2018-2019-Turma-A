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
 * @author BatPC
 */
public class TestEditarInteressados {
    
    static WebDriver driver = new ChromeDriver();
    //variavel utilizada para fazer o logout no final do teste
    boolean dologout = true;
    
    public TestEditarInteressados() {
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
    }

    @Test
    public void TesteEditarInteressados() throws Exception {
        //Selecionar a opção "utilizadores"
        List<WebElement> users =  driver.findElements(By.className("nav-item"));
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
        Thread.sleep(2000);
        //selecionar a edição do primeiro item
        WebElement interessadoEdit = driver.findElement(By.className("btn-warning"));
        interessadoEdit.click();
        Thread.sleep(2000);
        //alteração do campo "Nome"
        WebElement nomeField = driver.findElement(By.id("nomeInteressadoInput"));
        nomeField.clear();
        Thread.sleep(2000);
        //limpa-se o que estava anteriormente escrito
        nomeField.sendKeys("Esdrubal Teste Testado");
        Thread.sleep(2000);
        //confirmar edição
        List<WebElement> editConfirm =  driver.findElements(By.className("mb-5"));
        editConfirm.get(0).click();
        Thread.sleep(2000);
    }
}
    
