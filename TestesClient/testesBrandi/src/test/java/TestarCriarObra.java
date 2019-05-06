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
        
    }

    @After
    public void tearDown() {
    }

    // TODO add test methods here.
    // The methods must be annotated with annotation @Test. For example:
    //
    @Test
    public void testarCriarObra() throws InterruptedException {
        driver.get("brandi.ipt.pt:81");
        WebElement btnAddFicha = driver.findElement(By.className("btn-success"));
        btnAddFicha.click();
        
        WebElement dObjeto = driver.findElement(By.id("dObjeto"));
        dObjeto.sendKeys("Reliquia");
        WebElement procLCRM = driver.findElement(By.id("procLCRM"));
        procLCRM.sendKeys("something");
        WebElement procCEARC = driver.findElement(By.id("procCEARC"));
        procCEARC.sendKeys("something");
        WebElement dateEntrada = driver.findElement(By.id("dateEntrada"));
        dateEntrada.sendKeys("06/05/2019");
        WebElement dateConclusao = driver.findElement(By.id("dateConclusão"));
        dateConclusao.sendKeys("07/05/2019");
        WebElement dateEntrega = driver.findElement(By.id("dateEntrega"));
        dateEntrega.sendKeys("08/05/2019");
        WebElement coord = driver.findElement(By.id("coord"));
        coord.sendKeys("someone");
        WebElement dirTecn = driver.findElement(By.id("dirTecn"));
        dirTecn.sendKeys("someone");
        WebElement tecnicosCheckbox = driver.findElement(By.id("tecnicosCheckbox"));
        tecnicosCheckbox.click();
        WebElement propDonObra = driver.findElement(By.id("propDonObra"));
        propDonObra.sendKeys("someone");
        WebElement contact = driver.findElement(By.id("contact"));
        contact.sendKeys("912345678");
        WebElement endPostLocal = driver.findElement(By.id("endPostLocal"));
        endPostLocal.sendKeys("IPT");
        
        WebElement chooseFoto = driver.findElement(By.className("custom-file-input"));
        chooseFoto.click();
//        chooseFoto.sendKeys("C:\\Brandi-2018-2019-Turma-A\\TestesClient\\testesBrandi\\img\\img2.jepg");
        
        WebElement btnCriar = driver.findElement(By.className("btn-success"));
        btnCriar.click();
        
    }
    
    
}
