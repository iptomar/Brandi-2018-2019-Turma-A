/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.IOException;
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
        driver.manage().window().maximize();
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
    public void testarCriarObra() throws InterruptedException, AWTException, IOException {
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
        WebElement tipologias = driver.findElement(By.id("tipologia"));
        tipologias.sendKeys("IPT");
        WebElement analogias = driver.findElement(By.id("analogias"));
        analogias.sendKeys("IPT");
        WebElement endPostLocal = driver.findElement(By.id("dimensoes"));
        endPostLocal.sendKeys("IPT");
        WebElement outrasDimensoes = driver.findElement(By.id("outrasDimensoes"));
        outrasDimensoes.sendKeys("IPT");
        WebElement breveDescricao = driver.findElement(By.id("breveDescricao"));
        breveDescricao.sendKeys("IPT");
        WebElement conclusoes = driver.findElement(By.id("conclusoes"));
        conclusoes.sendKeys("IPT");
        WebElement oficina = driver.findElement(By.id("oficina"));
        oficina.sendKeys("IPT");
        WebElement datacao = driver.findElement(By.id("datacao"));
        datacao.sendKeys("IPT");
        WebElement localOrigem = driver.findElement(By.id("localOrigem"));
        localOrigem.sendKeys("IPT");
        WebElement superCategorias = driver.findElement(By.id("superCategorias"));
        superCategorias.sendKeys("IPT");
        WebElement categorias = driver.findElement(By.id("categorias"));
        categorias.sendKeys("IPT");
        WebElement subCategorias = driver.findElement(By.id("subCategorias"));
        subCategorias.sendKeys("IPT");
        
        Thread.sleep(2000);

        WebElement chooseFoto = driver.findElement(By.className("custom-file-input"));
        chooseFoto.click();
        
        
        
        WebElement btnCriar = driver.findElement(By.className("btn-success"));
        btnCriar.click();

        
    }
    
    
}
